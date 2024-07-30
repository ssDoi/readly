package com.ssafy.readly.entity;

import com.ssafy.readly.enums.ItemType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="timecapsule_items")
@NoArgsConstructor(access = PROTECTED)
public class TimeCapsuleItem {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;
    @Enumerated(value = STRING)
    private ItemType itemType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="timecapsule_id")
    private TimeCapsule timeCapsule;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="photocard_id")
    private PhotoCard photoCard;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="reviews_id")
    private Review review;

    /* 연관 관계 편의 메소드 */
    public void setTimeCapsule(TimeCapsule timeCapsule){
        if (this.timeCapsule != null) {
            this.timeCapsule.getTimeCapsuleItems().remove(this);
        }

        this.timeCapsule = timeCapsule;
        timeCapsule.getTimeCapsuleItems().add(this);
    }
}
