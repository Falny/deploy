package com.admin.admin_back.service;

import com.admin.admin_back.dao.PasswordDAO;
import com.admin.admin_back.model.PasswordModel;
import com.admin.admin_back.utils.PasswordUtils;
import org.springframework.stereotype.Component;

@Component
public class PasswordService {
    private PasswordDAO db;

    public PasswordService(PasswordDAO db) {
        this.db = db;
    }

    public void insert(PasswordModel model) {
        String password = model.getPassword();
        String hash = new PasswordUtils().createPassword(password);

        db.insertPassword(hash);
    }

    public Boolean checkPassword(PasswordModel model) {
        PasswordModel passwordFromDb = db.selectPassword();

        Boolean result = new PasswordUtils().checkPassword(model.getPassword(), passwordFromDb.getPassword());

        return result;
    }
}
