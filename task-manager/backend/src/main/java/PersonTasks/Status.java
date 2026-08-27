package PersonTasks;

public class Status {
    private String id_user;
    private String status;

    public String getId_userOnlyStatus() {
        return id_user;
    }

    public String getStatusOfOnlyStatus() {
        return status;
    }

    public void setId_userOfOnlyStatus(String id_user) {
        this.id_user = id_user;
    }

    public void setStatusOfOnlyStatus(String status) {
        this.status = status;
    }

    public String toString() {
        return "id_user = " + id_user + "; status = " + status;
    }
}
