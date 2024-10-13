class NQueensSolver:
    def __init__(self, N):
        self.N = N
        self.board = [[0 for _ in range(N)] for _ in range(N)]
        self.ld = [0] * 30
        self.rd = [0] * 30
        self.cl = [0] * 30
        
    def solve(self):
        if self.solveNQUtil(0):
            return self.board
        return None
        
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
