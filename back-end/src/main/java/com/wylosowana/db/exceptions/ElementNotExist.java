package com.wylosowana.db.exceptions;

public class ElementNotExist extends Exception {
    private static final long serialVersionUID = -1754300020385057922L;

    public ElementNotExist() {
    }

    public ElementNotExist(String message) {
        super(message);
    }
}
