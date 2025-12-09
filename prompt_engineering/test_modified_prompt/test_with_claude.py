#!/usr/bin/env python3
"""
Test SoLBot Enhanced Prompts with Claude 3.7

This script tests the enhanced prompts with mock responses using Claude 3.7 
and saves the results to a CSV file.
"""

import os
import json
import re
import time
import csv
import random
import anthropic
from dotenv import load_dotenv
from enhanced_prompts import get_prompt, IMPROVED_PROMPTS

# Load environment variables from .env file
load_dotenv()

# Claude API configuration
CLAUDE_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
if not CLAUDE_API_KEY:
    raise ValueError("ANTHROPIC_API_KEY environment variable not set")

CLAUDE_CLIENT = anthropic.Anthropic(api_key=CLAUDE_API_KEY)
CLAUDE_MODEL = "claude-3-7-sonnet-20250219"  # Using Claude 3.7 Sonnet as specified

# Metadata extraction regex pattern
METADATA_PATTERN = r'<!-- INSTRUCTOR_METADATA\n(.*?)\n-->'

def load_mock_data(file_path="solbot_mock_data.json"):
    """Load mock data from the JSON file."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading mock data: {e}")
        return None

def extract_metadata(response):
    """Extract metadata from Claude's response."""
    match = re.search(METADATA_PATTERN, response, re.DOTALL)
    if not match:
        return {"error": "No metadata found in response"}
    
    metadata_text = match.group(1)
    metadata = {}
    
    # Parse metadata key-value pairs
    for line in metadata_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            metadata[key.strip()] = value.strip()
    
    return metadata

def send_to_claude(prompt, student_response):
    """Send prompt with student response to Claude 3.7 and return the response."""
    full_prompt = f"{prompt}\n\nStudent response: {student_response}"
    
    try:
        response = CLAUDE_CLIENT.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=4000,
            temperature=0,
            system="You are an educational AI assistant helping students develop effective learning strategies.",
            messages=[{"role": "user", "content": full_prompt}]
        )
        return response.content[0].text
    except Exception as e:
        print(f"Error calling Claude API: {e}")
        return f"API Error: {e}"

def process_responses(mock_data, samples_per_level=5):
    """Process mock responses and return results for CSV output."""
    results = []
    
    for phase_name in IMPROVED_PROMPTS:
        print(f"Testing {phase_name}...")
        prompt = get_prompt(phase_name)
        
        if phase_name not in mock_data:
            print(f"Skipping {phase_name} - not found in mock data")
            continue
        
        for level in ["LOW", "MEDIUM", "HIGH"]:
            if level not in mock_data[phase_name]:
                print(f"Skipping {level} responses for {phase_name} - not found in mock data")
                continue
            
            # Get entries for this level
            entries = mock_data[phase_name][level]
            
            # Select a sample of entries to test
            sample_entries = random.sample(entries, min(samples_per_level, len(entries)))
            
            for i, entry in enumerate(sample_entries):
                student_response = entry["student_response"]
                expected_assessment = entry["assessment"]
                
                print(f"  Testing {level} response {i+1}...")
                
                # Get Claude's response
                claude_response = send_to_claude(prompt, student_response)
                
                # Extract metadata from Claude's response
                metadata = extract_metadata(claude_response)
                
                # Prepare result row
                result = {
                    "phase": phase_name,
                    "expected_level": level,
                    "student_response": student_response,
                    "claude_response": claude_response,
                }
                
                # Add expected assessment
                for key, value in expected_assessment.items():
                    result[f"expected_{key}"] = value
                
                # Add Claude's assessment
                for key, value in metadata.items():
                    result[f"claude_{key}"] = value
                
                results.append(result)
                
                # Add a delay to avoid rate limits
                time.sleep(2)
    
    return results

def save_to_csv(results, output_file="claude_test_results.csv"):
    """Save results to a CSV file."""
    if not results:
        print("No results to save.")
        return
    
    # Get all unique keys from all result dictionaries
    fieldnames = set()
    for result in results:
        fieldnames.update(result.keys())
    
    # Convert to sorted list for consistent column order
    fieldnames = sorted(list(fieldnames))
    
    # Write results to CSV
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)
    
    print(f"Results saved to {output_file}")

def main():
    """Main function to run the test."""
    print("Starting Claude 3.7 prompt testing...")
    
    # Load mock data
    mock_data = load_mock_data()
    if not mock_data:
        print("Failed to load mock data.")
        return
    
    # Process responses (5 samples per level)
    results = process_responses(mock_data, samples_per_level=5)
    
    # Save results to CSV
    save_to_csv(results)
    
    print("Testing complete!")

if __name__ == "__main__":
    main() 