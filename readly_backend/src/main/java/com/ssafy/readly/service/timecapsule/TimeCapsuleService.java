package com.ssafy.readly.service.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleAlarmResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleDateResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleRequest;

import java.util.List;

public interface TimeCapsuleService {
    List<ReviewResponse> getReviewsByPeriod(TimeCapsuleRequest timeCapsuleRequest);
    List<CreatePhotoCardResponse> getPhotoCardsByPeriod(TimeCapsuleRequest timeCapsuleRequest);
    void saveTimeCapsule(TimeCapsuleRequest timeCapsuleRequest);
    Long getTimeCapsuleCount(Integer memberId);
    List<TimeCapsuleAlarmResponse> getTimeCapsuleReleaseDate(Integer memberId);
    List<ReviewResponse> getTimeCapsuleReviews(int timeCapsuleId);
    List<CreatePhotoCardResponse> getTimeCapsulePhotoCards(int timeCapsuleId);
    TimeCapsuleDateResponse getTimeCapsuleDate(Integer timeCapsuleId);
    void deleteTimeCapsule(Integer timeCapsuleId);
}
