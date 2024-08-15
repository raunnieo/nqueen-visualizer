# NQueen-Visualizer

N-Queens Solver
This project is a graphical implementation of the N-Queens problem using Python's tkinter library. The N-Queens problem is a classic algorithmic challenge where the goal is to place N chess queens on an N×N chessboard so that no two queens threaten each other.

### 12x12 Queen Problem Solution
<img src="https://github.com/raunnieo/NQueen-Visualizer/blob/main/playground.png" width="350">   <img src="https://github.com/raunnieo/NQueen-Visualizer/blob/main/solution.png" width="345">


## Features
+ Customizable Board Size: A slider can adjust The board size from 4x4 to 12x12.
+ Graphical Representation: The chessboard and queens are displayed graphically, allowing users to visualize the solution.
+ Interactive Interface: Users can manually place and remove queens by clicking on the board.
+ Automatic Solution: The solver uses a backtracking algorithm to find a solution for the given board size.

## Working
+ Initialization: A 4x4 chessboard is displayed by default when the application starts.
+ Adjust Board Size: Use the slider to select the desired board size (up to 12x12).
+ Solve the Problem: Click the "Solve" button to find a solution automatically.
+ Manual Placement: You can also manually place or remove queens by clicking on the cells of the chessboard.
+ Reset the Board: The "Reset" button clears the board for a fresh start.

## Project Structure
The project is divided into three main files:

- **`gui.py`**: Handles the graphical user interface (GUI) components, including the board visualization, buttons, and interactive elements.
- **`solver.py`**: Contains the backtracking algorithm that solves the N-Queens problem.
- **`main.py`**: The main application file that connects the GUI with the solver and manages user interactions.

## How It Works
1. **Initialization**: When the application starts, a 4x4 chessboard is displayed by default.
2. **Adjust Board Size**: Use the slider to select the desired board size (up to 12x12).
3. **Solve the Problem**: Click the "Solve" button to find a solution automatically, using backtracking algorithm.
4. **Manual Placement**: You can also manually place or remove queens by clicking on the cells of the chessboard.
5. **Reset the Board**: The "Reset" button clears the board for a fresh start.

## Installation

To run this project, you need to have Python installed on your machine. Follow the steps below to set up and run the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/nqueens-solver.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd nqueens-solver
   ```
3. **Run the main application**:
   ```bash
   python main.py
   ```
