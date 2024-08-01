package com.ssafy.readly.controller;

import com.ssafy.readly.dto.group.GetGroupResponse;
import com.ssafy.readly.dto.group.MakeGroupRequest;
import com.ssafy.readly.service.chat.RedisPubService;
import com.ssafy.readly.service.group.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final RedisPubService redisPubService;

    @PostMapping("/makegroup")
    public ResponseEntity<?> makeGroup(@RequestBody MakeGroupRequest makeGroupRequest) throws Exception {

        String groupId = groupService.makeGroup(makeGroupRequest);
        groupService.updateRoomId(groupId, groupId);  // Use groupId directly as roomId
        redisPubService.subscribeChannel(groupId);

        return new ResponseEntity<>(HttpStatus.CREATED); // 201 Created 상태 코드로 변경
    }


    @GetMapping("/groups")
    public ResponseEntity<?> findAllGroup() throws Exception {
        // 모든 소모임 정보를 가져옵니다.
        List<GetGroupResponse> allGroup = groupService.findAllGroup();

        // 소모임 정보가 존재하는지 확인합니다.
        if (allGroup != null && !allGroup.isEmpty()) {
            return new ResponseEntity<>(allGroup, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }


}
