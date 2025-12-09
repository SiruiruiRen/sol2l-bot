#!/usr/bin/env python3
"""
Script to test all mock data entries for each phase and level.

This script loads the mock data and tests each entry against the enhanced prompts.
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

def test_all_entries():
    """Test every single mock data entry for all phases and levels."""
    mock_data = load_mock_data("solbot_mock_data.json")
    if not mock_data:
        print("Failed to load mock data.")
        return
    
    total_entries = 0
    successful_entries = 0
    
    for phase in IMPROVED_PROMPTS.keys():
        print(f"\n===== Testing phase: {phase} =====")
        
        if phase not in mock_data:
            print(f"Error: Phase {phase} not found in mock data")
            continue
        
        for level in ["LOW", "MEDIUM", "HIGH"]:
            if level not in mock_data[phase]:
                print(f"Error: Response level {level} not found in mock data for phase {phase}")
                continue
            
            entries = mock_data[phase][level]
            print(f"\n----- Testing {len(entries)} {level} entries for {phase} -----")
            
            for i, entry in enumerate(entries):
                total_entries += 1
                student_response = entry["student_response"]
                assessment = entry["assessment"]
                overall = assessment.get('OVERALL')
                
                print(f"\nEntry {i+1}:")
                print(f"Student response: {student_response}")
                
                # Verify OVERALL assessment matches the level
                if overall == level:
                    successful_entries += 1
                    print(f"Assessment: {assessment}")
                    print(f"Overall: {overall} ✓")
                else:
                    print(f"Assessment: {assessment}")
                    print(f"Overall: {overall} ✗ (Expected: {level})")
    
    print(f"\n===== Test Summary =====")
    print(f"Total entries tested: {total_entries}")
    print(f"Successful entries: {successful_entries}")
    print(f"Success rate: {successful_entries/total_entries*100:.2f}%")

if __name__ == "__main__":
    # Change to the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    print("Testing all mock data entries...")
    test_all_entries() 