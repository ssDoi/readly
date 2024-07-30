package com.ssafy.readly.repository.member;

import com.ssafy.readly.dto.member.FindMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberResponse;
import com.ssafy.readly.dto.member.UpdateMemberRequest;
import com.ssafy.readly.entity.Member;

import java.util.Optional;

public interface MemberRepository {

    public abstract void signUp(Member member);

    public abstract Optional<LoginMemberResponse> login(LoginMemberRequest longinMember);

    public abstract void logout(String userId);

    public abstract Optional<Member> findById(int id);

    public abstract Long findByLoginId(String loginId);

    public abstract void updateMember(UpdateMemberRequest UpdateMember);

    public abstract String checkMember(FindMemberRequest findMember);

}