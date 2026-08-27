package PersonTasks;

import org.json.simple.JSONArray;

import java.util.ArrayList;

public class Users {
    private String id;
    private String login;
    private String username;
    private String password;
    private String avatars;
    private String token;
    private Boolean isHowCreated;
    private int countCreateTask;
    private int countDeleteTask;
    private int countExpiredTask;
    private int countTaskWereYouAdd;
    private int countAddFriend;
    private int countCreateProject;
    private int countDeleteProject;
    private int countProjectWereYouAdd;
    private ArrayList<String> friends;
    private ArrayList<String> activeProject;
    private ArrayList<String> activeTask;
    private ArrayList<String> deleteTask;
    private ArrayList<String> deleteProject;
    private JSONArray statisticsForMonth;

    public void setStatisticsForMonth(JSONArray statisticsForMonth) {
        this.statisticsForMonth = statisticsForMonth;
    }

    public JSONArray getStatisticsForMonth() {
        if (statisticsForMonth == null) {
            return new JSONArray();
        }
        return statisticsForMonth;
    }

    public void setCountProjectWereYouAdd(int countProjectWereYouAdd) {
        this.countProjectWereYouAdd = countProjectWereYouAdd;
    }

    public void setCountTaskWereYouAdd(int countTaskWereYouAdd) {
        this.countTaskWereYouAdd = countTaskWereYouAdd;
    }

    public int getCountTaskWereYouAdd() {
        return countTaskWereYouAdd;
    }

    public int getCountProjectWereYouAdd() {
        return countProjectWereYouAdd;
    }

    public void setCountDeleteProject(int countDeleteProject) {
        this.countDeleteProject = countDeleteProject;
    }

    public void setCountCreateProject(int countCreateProject) {
        this.countCreateProject = countCreateProject;
    }

    public void setCountAddFriend(int countAddFriend) {
        this.countAddFriend = countAddFriend;
    }

    public void setCountExpiredTask(int countExpiredTask) {
        this.countExpiredTask = countExpiredTask;
    }

    public void setCountDeleteTask(int countDeleteTask) {
        this.countDeleteTask = countDeleteTask;
    }

    public void setCountCreateTask(int countCreateTask) {
        this.countCreateTask = countCreateTask;
    }

    public int getCountCreateTask() {
        return countCreateTask;
    }

    public int getCountDeleteTask() {
        return countDeleteTask;
    }

    public int getCountExpiredTask() {
        return countExpiredTask;
    }

    public int getCountAddFriend() {
        return countAddFriend;
    }

    public int getCountCreateProject() {
        return countCreateProject;
    }

    public int getCountDeleteProject() {
        return countDeleteProject;
    }

    public void setIsHowCreated(Boolean isHowCreated) {
        this.isHowCreated = isHowCreated;
    }

    public Boolean getIsHowCreated() {
        return isHowCreated;
    }

    public void setDeleteTask(ArrayList<String> deleteTask) {
        this.deleteTask = deleteTask;
    }

    public void setDeleteProject(ArrayList<String> deleteProject) {
        this.deleteProject = deleteProject;
    }

    public ArrayList<String> getDeleteTask() {
        return deleteTask;
    }

    public ArrayList<String> getDeleteProject() {
        return deleteProject;
    }

    public void setActiveTask(ArrayList<String> activeTask) {
        this.activeTask = activeTask;
    }

    public ArrayList<String> getActiveTask() {
        return activeTask;
    }

    public String getId() {
        return id;
    }

    public void setId(String id_) {
        id = id_;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login_) {
        login = login_;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username_) {
        username = username_;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password_) {
        password = password_;
    }

    public String getAvatars() {
        return avatars;
    }

    public void setAvatars(String avatars_) {
        avatars = avatars_;
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token_) {
        token = token_;
    }


    public ArrayList<String> getFriends() {
        return friends;
    }

    public void setFriends(ArrayList<String> friends_) {
        friends = friends_;
    }

    public ArrayList<String> getActiveProject() {
        return activeProject;
    }

    public void setActiveProject(ArrayList<String> activeProject_) {
        activeProject = activeProject_;
    }


    public String toString() {
        return "User id = " + id + "; login = " + login + "; username = " + username + "; password = " + password + "; friend = " + friends + "; activeProject = " + activeProject + "; activeTask = " + activeTask + "; deleteTask = " + deleteTask;
    }
}
