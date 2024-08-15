import tkinter as tk
from tkinter import messagebox

N = 4

ld = [0] * 30
rd = [0] * 30
cl = [0] * 30


def solveNQUtil(board, col):
    if col >= N:
        return True

    for i in range(N):
        if (ld[i - col + N - 1] != 1 and rd[i + col] != 1) and cl[i] != 1:
            board[i][col] = 1
            ld[i - col + N - 1] = rd[i + col] = cl[i] = 1

            if solveNQUtil(board, col + 1):
                return True

            board[i][col] = 0
            ld[i - col + N - 1] = rd[i + col] = cl[i] = 0

    return False


def solveNQ():
    board = [[0 for _ in range(N)] for _ in range(N)]

    if not solveNQUtil(board, 0):
        messagebox.showinfo("4-Queens Solution", "Solution does not exist")
        return None

    return board


def display_solution():
    solution_board = solveNQ()

    if solution_board:
        draw_grid(solution_board)


def draw_grid(board):
    for i in range(N):
        for j in range(N):
            color = "white" if (i + j) % 2 == 0 else "black"
            queen_color = "red" if board[i][j] == 1 else color
            canvas.itemconfig(cells[i][j], fill=queen_color)


# Create Tkinter window
window = tk.Tk()
window.title("4-Queens Solver")

# Create GUI components
canvas = tk.Canvas(window, width=N * 50, height=N * 50, bg="white")
canvas.pack()

cells = [[canvas.create_rectangle(j * 50, i * 50, (j + 1) * 50, (i + 1) * 50, fill="white" if (i + j) % 2 == 0 else "black")
          for j in range(N)] for i in range(N)]

solve_button = tk.Button(window, text="Solve 4-Queens", command=display_solution)
solve_button.pack()

# Run Tkinter main loop
window.mainloop()
