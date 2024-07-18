package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name="bad_dates")
@NoArgsConstructor(access = PROTECTED)
public class BadDate {

    @Id
    @GeneratedValue
    private int id;
    private LocalDate badDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="member_id")
    private Member member;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="group_id")
    private Group group;

}
