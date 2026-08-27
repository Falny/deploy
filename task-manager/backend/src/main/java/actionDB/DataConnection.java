package actionDB;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DataConnection {

    private String url;
    private String name;
    private String password;

    public DataConnection() {
        fileReader();
    }

    public void fileReader() {

        this.url = System.getenv("DB_URL");
        this.name = System.getenv("DB_USERNAME");
        this.password = System.getenv("DB_PASSWORD");
    }

    public Connection connection() throws SQLException {
        return DriverManager.getConnection(url, name, password);
    }
}
