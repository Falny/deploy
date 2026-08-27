package PersonTasks;

import java.util.ArrayList;

public class Tasks {
    public String id_task;
    public String id_project;
    public String id_user;
    public String name;
    public String description;
    public String dateStart;
    public String dateEnd;
    public String status;
    public ArrayList<String> employee;

    public void setId_user(String id_user) {
        this.id_user = id_user;
    }

    public String getId_user() {
        return id_user;
    }

    public void setId_project(String id_project) {
        this.id_project = id_project;
    }

    public void setEmployee(ArrayList<String> employee) {
        this.employee = employee;
    }

    public String getId_project() {
        return id_project;
    }

    public ArrayList<String> getEmployee() {
        return employee;
    }

    public void setId_task(String id_task) {
        this.id_task = id_task;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getId_task() {
        return id_task;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getDateStart() {
        return dateStart;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public String getStatus() {
        return status;
    }

    public String toString() {
        return "Task:  id-task=  " + id_task + "; name = " + name + "; description = " + description + "; dateStart = " + dateStart + "; dateEnd = " + dateEnd + "; status = " + status + "; employee = " + employee ;
    }
}
