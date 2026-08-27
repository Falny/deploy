package PersonTasks;

import java.util.ArrayList;

public class Project {
    private String id_project;
    private String id_user;
    private String name;
    private String description;
    private String dateStart;
    private String dateEnd;
    private ArrayList<String> adminOfProject;

    public void setId_project(String id_project) {
        this.id_project = id_project;
    }

    public void setAdminOfProject(ArrayList<String> adminOfProject) {
        this.adminOfProject = adminOfProject;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }

    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId_user(String id_user) {
        this.id_user = id_user;
    }

    public String getId_project() {
        return id_project;
    }

    public ArrayList<String> getAdminOfProject() {
        return adminOfProject;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public String getDateStart() {
        return dateStart;
    }

    public String getDescription() {
        return description;
    }

    public String getId_user() {
        return id_user;
    }

    public String getName() {
        return name;
    }
}
