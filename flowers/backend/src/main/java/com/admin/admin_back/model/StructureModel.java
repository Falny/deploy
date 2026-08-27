package com.admin.admin_back.model;

import java.util.List;

public class StructureModel {
    private String id;
    private String structure;

    public StructureModel(String structure) {
        this.structure = structure;
    }

    public StructureModel() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
    }

    public String toString() {
        return id+ " " + structure;
    }
}
