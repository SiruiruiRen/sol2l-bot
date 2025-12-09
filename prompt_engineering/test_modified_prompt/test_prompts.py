#!/usr/bin/env python3
"""
Test script for enhanced prompts and mock data.

This script tests that the enhanced prompts and mock data can be loaded and used correctly.
"""

import json
import os
import sys
from enhanced_prompts import get_prompt, IMPROVED_PROMPTS

def load_mock_data(file_path):
    """
    Load the mock data from the JSON file.
    
    Args:
        file_path (str): Path to the mock data JSON file.
        
    Returns:
        dict: The loaded mock data.
    """
    try:
        with open(file_path, 'r') as f:
            mock_data = json.load(f)
        return mock_data
    except Exception as e:
        print(f"Error loading mock data: {e}")
        return None

def test_prompt(phase, response_level):
    """
    Test a specific prompt with a mock response.
    
    Args:
        phase (str): The phase name to test.
        response_level (str): The response level to test (LOW, MEDIUM, HIGH).
    """
    prompt = get_prompt(phase)
    if not prompt:
        print(f"Error: Could not get prompt for {phase}")
        return
    
    mock_data = load_mock_data("solbot_mock_data.json")
    if not mock_data:
        return
    
    if phase not in mock_data:
        print(f"Error: Phase {phase} not found in mock data")
        return
    
    if response_level not in mock_data[phase]:
        print(f"Error: Response level {response_level} not found in mock data for phase {phase}")
        return
    
    # Get the first mock response for this phase and level
    mock_response = mock_data[phase][response_level][0]["student_response"]
    assessment = mock_data[phase][response_level][0]["assessment"]
    
    print(f"\nTesting {phase} - {response_level}:")
    print(f"Student response: {mock_response}")
    print(f"Assessment: {assessment}")
    print(f"Overall: {assessment.get('OVERALL')}")
    print("Test successful!")

def test_all_phases():
    """Test all available phases with all response levels."""
    for phase in IMPROVED_PROMPTS.keys():
        for level in ["LOW", "MEDIUM", "HIGH"]:
            test_prompt(phase, level)

if __name__ == "__main__":
    # Change to the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    print("Testing enhanced prompts with mock data...")
    test_all_phases()
    print("\nAll tests completed!") 