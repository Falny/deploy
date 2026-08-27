package actionDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

// таблица users

// СОЗДАНИЕ ТАБЛИЦЫ USERS

// создает

// id
// login
// password

public class DBCreateUsers {

    private String sql = "CREATE TABLE IF NOT EXISTS users (" +
            "id VARCHAR(100) UNIQUE PRIMARY KEY," +
            "login VARCHAR(50) UNIQUE NOT NULL," +
            "username VARCHAR(50) NULL," +
            "password VARCHAR(255) NULL," +
            "yandex_id VARCHAR(255) NULL,"+
            "avatars TEXT NULL," +
            "friends TEXT[] NULL," +
            "activeProject TEXT[] NULL," + // это нужно, чтобы хранить активные проекты свои и те, что назначили другие люди
            "activeTask TEXT[] NULL," +
            "deleteTask TEXT[] NULL," + // временно удаленные задачи
            "deleteProject TEXT[] NULL," + // временно удаленные проекты
            "isHowCreated BOOLEAN NOT NULL," + // как пользователь зашел? нужно для обработки пароля
            "countCreateTask INTEGER DEFAULT 0," + // сколько созданных задач
            "countDeleteTask INTEGER DEFAULT 0," + // кол-во удаленных (выполненных) задач
            "countTaskWereYouAdd INTEGER DEFAULT 0," + // кол-во задач, в которые тебя добавили
            "countExpiredTask INTEGER DEFAULT 0," + // кол-во просроченный задач
            "countAddFriend INTEGER DEFAULT 0," + // кол-во добавленных друзей
            "countCreateProject INTEGER DEFAULT 0," + // кол-во созданных проектов
            "countDeleteProject INTEGER DEFAULT 0," + // кол-во удаленных (выполненных) проектов
            "countProjectWereYouAdd INTEGER DEFAULT 0," +// кол-во проектов, в которые тебя добавили
            "statisticsForMonth JSONB" + // сбор статистики за год такого вида [{month: 1, count..: 1, count..: 1 и тд}, ...]
            ")";


    public void createDB() {
        try (Connection conn = new DataConnection().connection(); Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);

        } catch (SQLException error) {
            System.out.println("Error to create db users " + error.getMessage());
        }
    }
}
