
import Component.*;
import LoginSignin.HandleCheckPassword;
import LoginSignin.HandleLogin;
import LoginSignin.HandlerCheckLogin;
import LoginSignin.HandlerRegistration;
import actionDB.*;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;


public class Main {

//    private static Boolean toggleDBCreate = false;

    public static void main(String[] args) throws IOException {

        DBCreateUsers db = new DBCreateUsers();
        db.createDB();
        DBCreateTokenUser dbToken = new DBCreateTokenUser();
        dbToken.createTokenUser();
        DBCreateProject dbProject = new DBCreateProject();
        dbProject.dbCreateProject();
        DBCreateTasks dbTasks = new DBCreateTasks();
        dbTasks.createDBTasks();
        new DBCreateStatus().createDBStatus();
        DBCreateNotification dbNotification = new DBCreateNotification();
        dbNotification.createDBNotification();

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.setExecutor(Executors.newFixedThreadPool(10));
        server.createContext("/registration", new HandlerRegistration());
        server.createContext("/check-password", new HandleCheckPassword());
        server.createContext("/create-password", new HandleCreatePassword());
        server.createContext("/update-password", new HandleUpdatePassword());
        server.createContext("/login", new HandleLogin());
        server.createContext("/check-login", new HandlerCheckLogin());
        server.createContext("/get-login-yandex", new HandleGetLoginYandex());
        server.createContext("/get-login-profile", new HandleGetLoginProfile());
        server.createContext("/profile", new HandleProfile());
        server.createContext("/update-profile", new HandleUpdateProfile());
        server.createContext("/task", new HandleTask());
        server.createContext("/update-task", new HandlUpdateTask());
        server.createContext("/get-tasks", new HandleGetTasks());
        server.createContext("/transfer-task", new HandleTransferTasks());
        server.createContext("/get-transfer-task", new HandleGetTransferTasks());
        server.createContext("/delete-transfer-task", new HandleDeleteTransferTasks());
        server.createContext("/update-transfer-task", new HandleUpdateTransferTasks());
        server.createContext("/get-status", new HandleGetStatus());
        server.createContext("/update-status", new HandleUpdateStatus());
        server.createContext("/delete-status", new HandleDeleteStatus());
        server.createContext("/search-friend", new HandlSearchPeople());
        server.createContext("/get-friend", new HandleGetFriend());
        server.createContext("/delete-friend", new HandleDeleteFriend());
        server.createContext("/create-notification", new HandleCreateNotification());
        server.createContext("/get-notification", new HandleGetNotification());
        server.createContext("/delete-notification", new HandleDeleteNotification());
        server.createContext("/update-notification", new HandleUpdateNotification());
        server.createContext("/create-project", new HandleProject());
        server.createContext("/edit-project", new HandleUpdateProject());
        server.createContext("/get-project", new HandleGetProject());
        server.createContext("/delete-project", new HandleDeleteProject());
        server.createContext("/dashboard", new HandleDashboard());

        server.start();
    }
}