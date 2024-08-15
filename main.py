import tkinter as tk
from tkinter import messagebox
from gui import NQueensGUI
from solver import NQueensSolver

class NQueensApp:
    def __init__(self, master):
        self.master = master
        self.gui = NQueensGUI(master)
        self.N = 4
        self.board = [[0 for _ in range(self.N)] for _ in range(self.N)]
        
        self.gui.solve_button.config(command=self.solve)
        self.gui.reset_button.config(command=self.reset_board)
        self.gui.canvas.bind("<Button-1>", self.on_click)
        self.gui.size_scale.config(command=self.update_board_size)
        
    def update_board_size(self, *args):
        self.N = self.gui.size_scale.get()
        self.reset_board()
        
    def reset_board(self):
        self.board = [[0 for _ in range(self.N)] for _ in range(self.N)]
        self.gui.draw_grid(self.N, self.board)
        
    def on_click(self, event):
        col = event.x // 50
        row = event.y // 50
        if col < self.N and row < self.N:
            self.board[row][col] = 1 - self.board[row][col]  # Toggle queen
            self.gui.draw_grid(self.N, self.board)
        
    def solve(self):
        solver = NQueensSolver(self.N)
        solution = solver.solve()
        if solution:
            self.board = solution
            self.gui.draw_grid(self.N, self.board)
        else:
            messagebox.showinfo("N-Queens Solution", "Solution does not exist")

if __name__ == "__main__":
    root = tk.Tk()
    app = NQueensApp(root)
    root.mainloop()
