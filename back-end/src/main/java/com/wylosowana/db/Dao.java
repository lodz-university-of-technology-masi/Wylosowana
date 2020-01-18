package com.wylosowana.db;

import com.wylosowana.db.exceptions.ElementNotExist;

import java.util.List;
import java.util.Optional;

public interface Dao<T, I> {
    List<T> findAll();

    Optional<T> findById(I id);

    Optional<T> save(T item);

    void delete(T item) throws ElementNotExist;
}
