package com.ssafy.readly.repository.like;

import com.ssafy.readly.entity.Like;

public interface LikeRepository {
    void save(Like like);
    void delete(Like like);
}
