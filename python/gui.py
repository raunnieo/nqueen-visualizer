import tkinter as tk
from tkinter import Scale

class NQueensGUI:
    def __init__(self, master, max_N=12):
        self.master = master
        self.master.title("N-Queens Solver")
        self.max_N = max_N
        
        self.create_widgets()
        
    def create_widgets(self):
        # Size selector
        self.size_scale = Scale(self.master, from_=4, to=self.max_N, orient=tk.HORIZONTAL, label="Board Size", command=self.update_board_size)
        self.size_scale.set(4)
        self.size_scale.pack()
        
        # Canvas for the chessboard
        self.canvas = tk.Canvas(self.master, width=self.max_N * 50, height=self.max_N * 50, bg="white")
        self.canvas.pack()
        
        # Solve button
        self.solve_button = tk.Button(self.master, text="Solve")
        self.solve_button.pack()
        
        # Reset button
        self.reset_button = tk.Button(self.master, text="Reset")
        self.reset_button.pack()
        
        self.cells = [[self.canvas.create_rectangle(j * 50, i * 50, (j + 1) * 50, (i + 1) * 50, fill="white" if (i + j) % 2 == 0 else "gray")
                       for j in range(self.max_N)] for i in range(self.max_N)]
        
        self.queen_texts = [[self.canvas.create_text(j * 50 + 25, i * 50 + 25, text="", font=("Arial", 20, "bold"))
                             for j in range(self.max_N)] for i in range(self.max_N)]
        
    def update_board_size(self, *args):
        N = self.size_scale.get()
        self.draw_grid(N, [[0 for _ in range(N)] for _ in range(N)])
        
    def draw_grid(self, N, board):
        for i in range(self.max_N):
            for j in range(self.max_N):
                color = "white" if (i + j) % 2 == 0 else "gray"
                if i < N and j < N:
                    self.canvas.itemconfig(self.cells[i][j], fill=color, state=tk.NORMAL)
                    if board[i][j] == 1:
                        self.canvas.itemconfig(self.queen_texts[i][j], text="Q", state=tk.NORMAL)
                    else:
                        self.canvas.itemconfig(self.queen_texts[i][j], text="", state=tk.NORMAL)
                else:
                    self.canvas.itemconfig(self.cells[i][j], fill="white", state=tk.HIDDEN)
                    self.canvas.itemconfig(self.queen_texts[i][j], state=tk.HIDDEN)
