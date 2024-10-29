import {AcGameObject} from "@/assets/scripts/AcGameObject";
import {Wall} from "@/assets/scripts/Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;
        this.inner_walls_count = 50;

        this.rows = 13;
        this.cols = 13;
    }

    start() {
        let i = 10000;

        while (i --){
            if (this.create_wall()) break;
        }

    }

    check_connectivity(g, sx, sy) {
        let visited = [];
        for (let i = 0; i < this.rows; i++) {
            visited[i] = [];
            for (let j = 0; j < this.cols; j++) {
                visited[i][j] = false;
            }
        }

        this.dfs(visited, g, sx, sy);

        for (let r = 1; r < this.rows - 1; r++) {
            for (let c = 1; c < this.cols - 1; c++) {
                if (!g[r][c] && !visited[r][c]) {
                    return false;
                }
            }
        }
        return true;
    }

    dfs(visited, g, r, c) {
        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        if (r < 0 || c < 0 || r >= this.rows || c >= this.cols || g[r][c] || visited[r][c]) {
            return;
        }
        visited[r][c] = true;
        for (let i = 0; i < 4; i ++) {
            this.dfs(visited, g, r + dx[i], c + dy[i]);
        }
    }

    create_wall() {
        const g = [];
        for (let r = 0; r < this.rows; r ++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c ++){
                g[r][c] = false;
            }
        }

        for (let r = 0; r < this.rows; r ++){
            for (let c = 0; c < this.cols; c ++){
                if (!r || !c || r === this.rows - 1 || c === this.cols - 1 && !g[r][c]){
                    new Wall(r, c, this, "#aa6105");
                    g[r][c] = true;
                }
            }
        }

        // 随机生成墙
        for (let i = 0; i < this.inner_walls_count / 2; i++)  {
            for (let j = 0; j < 1000; j++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[c][r]) continue;

                if (r === this.rows - 2 && c === 1 || c === this.cols - 2 && r === 1) continue;
                g[r][c] = g[c][r] = true;
                break;
            }
        }

        // 判断所有空地是否连通
        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g, this.rows - 2, 1)) return false;

        for (let r = 1; r < this.rows - 1; r ++) {
            for (let c = 1; c < this.cols - 1; c++) {
                if (g[r][c]) new Wall(r, c, this, "#B37226");
            }
        }

        return true;
    }

    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.update_size();
        this.render();
    }

    render() {
        const color_eve = "#AAD751", color_odd = "#A2D149";
        for (let c = 0; c < this.rows; c ++) {
            for (let r = 0; r < this.cols; r ++) {
                if (c + r & 1) this.ctx.fillStyle = color_odd;
                else this.ctx.fillStyle = color_eve;
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}