package com.ssafy.readly.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name="readed_books")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReadedBook {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Book book;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Member member;


}
