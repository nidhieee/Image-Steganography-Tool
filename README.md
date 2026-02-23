# Image-Steganography-Tool

A lightweight, purely logical Python tool for hiding and extracting text within the binary data of image files. 

## Overview
This project implements the Least Significant Bit (LSB) steganography technique. It manipulates the fundamental pixel data of an image to conceal a text payload, demonstrating that effective security often relies on the unseen. The human eye cannot perceive the binary manipulation, allowing the data to remain undetected in plain sight.

## Features
* **Data Concealment:** Encodes text payloads directly into the RGB channels of lossless image files using bitwise operations.
* **Precision Retrieval:** Decodes and extracts the hidden payload seamlessly using a hardcoded delimiter (`#####`).
* **Lossless Integrity:** Enforces PNG output to prevent lossy compression algorithms (like JPEG) from destroying the concealed binary data.

## Prerequisites
Ensure Python 3 or latest python version is installed on your system. The project requires the `Pillow` library to handle image input/output.

```bash
pip install Pillow
