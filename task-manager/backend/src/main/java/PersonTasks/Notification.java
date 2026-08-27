package PersonTasks;

public class Notification {
    private String id_notification;
    private String id_user; // это всегда пользователь, которому отправили запрос
    private String text;
    private String time;
    private Boolean statusNotification;
    private Boolean statusFriendNotification;
    private String fromUser;

    public void setId_notification(String id_notification) {
        this.id_notification = id_notification;
    }
    public void setId_user(String id_user_) {
        id_user = id_user_;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setStatusNotification(Boolean status) {
        this.statusNotification = status;
    }

    public void setStatusFriendNotification(Boolean status) {
        this.statusFriendNotification = status;
    }

    public void setFrom(String from) {
        this.fromUser = from;
    }

    public String getId_notification() {
        return id_notification;
    }
    public String getId_user() {
        return id_user;
    }

    public String getText() {
        return text;
    }

    public String getTime() {
        return time;
    }

    public Boolean getStatusNotification() {
        return statusNotification;
    }

    public Boolean getStatusFriendNotification() {
        return statusFriendNotification;
    }

    public String getFrom() {
        return fromUser;
    }
}
