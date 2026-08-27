package SendResponse;

import org.json.simple.JSONObject;

public class SendStatusSuccess {
    public String sendStatusSuccess(Boolean statusSuccess, String text) {
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("success", statusSuccess);
        jsonObj.put("text", text);
        String data = jsonObj.toJSONString();
        return data;
    }
}
