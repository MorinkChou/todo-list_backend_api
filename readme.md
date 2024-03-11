# Todo App API

這是一個簡單具有CRUD功能的todo-list api

* * *

### 需要預先安裝
 - Node.js
 - npm
 - MongoDB

* * *

### 安裝
1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/todo-app-api.git
   cd todo-app-api
2. Install dependencies:

    ```bash
    npm install
3. 設定環境:

    建立.env檔於此目錄，設定資料庫路徑  
    例如：
   ```env
   DB_HOST=mongodb://localhost:27017/todoapp
4. start server:

    ```bash
    npm start
* * *
## API 端點

### GET ALL TODOS
* `GET /api/todos`
* 取得所有任務

### CREATE TODO
* `POST /api/todos`
* 建立新任務
*   
    ```json
    {
        "task": "Your task description"
    }

### UPDATE TODO STATUS
* `PUT /api/todos/:id`
* 用來改變任務的狀態（完成/未完成）
* Replace `:id` with the ID of the todo

### DELETE TODOS
* `DELETE /api/todos/:id`
* 刪除任務
* Replace `:id` with the ID of the todo
