import tkinter as tk
from tkinter import messagebox, Scale

class NQueensSolver:
    def __init__(self, master):
        self.master = master
        self.master.title("N-Queens Solver")
        
        self.N = 4  # Default board size
        self.max_N = 12  # Maximum board size
        
        self.ld = [0] * 30
        self.rd = [0] * 30
        self.cl = [0] * 30
        
        self.board = [[0 for _ in range(self.max_N)] for _ in range(self.max_N)]
        
        self.create_widgets()
        
    def create_widgets(self):
        # Size selector
        self.size_scale = Scale(self.master, from_=4, to=self.max_N, orient=tk.HORIZONTAL, label="Board Size", command=self.update_board_size)
        self.size_scale.set(self.N)
        self.size_scale.pack()
        
        # Canvas for the chessboard
        self.canvas = tk.Canvas(self.master, width=self.max_N * 50, height=self.max_N * 50, bg="white")
        self.canvas.pack()
        
        # Solve button
        self.solve_button = tk.Button(self.master, text="Solve", command=self.solve)
        self.solve_button.pack()
        
        # Reset button
        self.reset_button = tk.Button(self.master, text="Reset", command=self.reset_board)
        self.reset_button.pack()
        
        self.cells = [[self.canvas.create_rectangle(j * 50, i * 50, (j + 1) * 50, (i + 1) * 50, fill="white" if (i + j) % 2 == 0 else "gray")
                       for j in range(self.max_N)] for i in range(self.max_N)]
        
        self.queen_texts = [[self.canvas.create_text(j * 50 + 25, i * 50 + 25, text="", font=("Arial", 20, "bold"))
                             for j in range(self.max_N)] for i in range(self.max_N)]
        
        self.canvas.bind("<Button-1>", self.on_click)
        
        self.update_board_size()
        
    def update_board_size(self, *args):
        self.N = self.size_scale.get()
        self.reset_board()
        
    def reset_board(self):
        self.board = [[0 for _ in range(self.N)] for _ in range(self.N)]
        self.draw_grid()
        
    def on_click(self, event):
        col = event.x // 50
        row = event.y // 50
        if col < self.N and row < self.N:
            self.board[row][col] = 1 - self.board[row][col]  # Toggle queen
            self.draw_grid()
        
    def draw_grid(self):
        for i in range(self.max_N):
            for j in range(self.max_N):
                color = "white" if (i + j) % 2 == 0 else "gray"
                if i < self.N and j < self.N:
                    self.canvas.itemconfig(self.cells[i][j], fill=color, state=tk.NORMAL)
                    if self.board[i][j] == 1:
                        self.canvas.itemconfig(self.queen_texts[i][j], text="Q", state=tk.NORMAL)
                    else:
                        self.canvas.itemconfig(self.queen_texts[i][j], text="", state=tk.NORMAL)
                else:
                    self.canvas.itemconfig(self.cells[i][j], fill="white", state=tk.HIDDEN)
                    self.canvas.itemconfig(self.queen_texts[i][j], state=tk.HIDDEN)
        
    def solve(self):
        if self.solveNQUtil(0):
            self.draw_grid()
        else:
            messagebox.showinfo("N-Queens Solution", "Solution does not exist")
        
    def solveNQUtil(self, col):
        if col >= self.N:
            return True
        
        for i in range(self.N):
            if self.is_safe(i, col):
                self.board[i][col] = 1
                self.ld[i - col + self.N - 1] = self.rd[i + col] = self.cl[i] = 1
                
                if self.solveNQUtil(col + 1):
                    return True
                
                self.board[i][col] = 0
                self.ld[i - col + self.N - 1] = self.rd[i + col] = self.cl[i] = 0
        
        return False
    
    def is_safe(self, row, col):
        return (self.ld[row - col + self.N - 1] != 1 and
                self.rd[row + col] != 1 and
                self.cl[row] != 1)

if __name__ == "__main__":
    root = tk.Tk()
    app = NQueensSolver(root)
    root.mainloop()
