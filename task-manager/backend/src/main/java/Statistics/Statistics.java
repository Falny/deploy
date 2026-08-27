package Statistics;

import actionDB.DBUsers;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Statistics {
    public void statisctics(DBUsers dbUsers, String id_user, String value, JSONArray statistics, int count) {
        // получаю число
        try {
            System.out.println("Come statistics = " + statistics);
            int month = LocalDate.now().getMonthValue();
            boolean flagFindMonthInStat = false; // флаг для нахождения месяца в статистике, если его нет, то я создаю новое поле месяца

            ArrayList<String> fieldOfStatistics = new ArrayList<>(List.of("countCreateTask", "countDeleteTask", "countTaskWereYouAdd", "countExpiredTask", "countAddFriend", "countCreateProject", "countDeleteProject", "countProjectWereYouAdd"));

            JSONArray jsonArray = new JSONArray();

            // удаляю значение из списка то, которое передается сюда, потому что при обновлении мне нужно циклом пробегаться по этим значениям и обнулять их
            fieldOfStatistics.remove(value);


            if (statistics != null) {

                for (Object stat : statistics) {
                    JSONObject objJson = (JSONObject) stat;
                    int monthFromStat = ((Long) objJson.get("month")).intValue();

                    if (monthFromStat == month) {
                        int valueOfStat = ((Long) objJson.getOrDefault(value, 0L)).intValue() + count;
                        objJson.put(value, valueOfStat);
                        flagFindMonthInStat = true;
                    }

                    jsonArray.add(objJson);
                }

                if (!flagFindMonthInStat) {
                    // делаю новый месяц
                    JSONObject jsonNewMonth = new JSONObject();
                    jsonNewMonth.put("month", month);
                    jsonNewMonth.put(value, 1); // прибавляю на 1 тому значению, что пришло изначально
                    for (String field : fieldOfStatistics) {
                        jsonNewMonth.put(field, 0); // обнуляю отслаьные значение
                    }
                    jsonArray.add(jsonNewMonth);
                }


                Boolean resultUpdate = dbUsers.updateDataUserStat(id_user, jsonArray.toJSONString());

                if (!resultUpdate) {
                    System.out.println("Ошибка добавления главной статистики -> статистика");
                }

            } else {
                // если вообще новая статистика, то создаю все эти поля и добавляю текущее прешедшее (value) на 1
                System.out.println("111");
                JSONObject jsonNewMonth = new JSONObject();
                jsonNewMonth.put("month", month);
                jsonNewMonth.put(value, 1); // прибавляю на 1 тому значению, что пришло изначально
                for (String field : fieldOfStatistics) {
                    jsonNewMonth.put(field, 0); // обнуляю отслаьные значение
                }
                jsonArray.add(jsonNewMonth.toJSONString());


                Boolean resultNewStat = dbUsers.updateDataUserStat(id_user, jsonArray.toJSONString());
                if (!resultNewStat) {
                    System.out.println("Ошибка добавления начальной главной статистики -> статистика");
                }


            }
        } catch (Exception error) {
            System.out.println("Error to parse in statistics " + error.getMessage());
        }
    }
}
