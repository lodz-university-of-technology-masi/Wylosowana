package com.wylosowana.db.tests;


import com.wylosowana.db.Dao;
import com.wylosowana.domain.tests.Test;

import java.util.List;

public interface TestDao extends Dao<Test, String> {
    List<Test> findByCandidateLogin(String login);
}
