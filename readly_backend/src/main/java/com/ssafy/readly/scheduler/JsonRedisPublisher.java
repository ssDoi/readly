package com.ssafy.readly.scheduler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JsonRedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public void publish(String channel, Object message) throws JsonProcessingException {
        String jsonMessage = objectMapper.writeValueAsString(message);
        redisTemplate.convertAndSend(channel, jsonMessage);
    }
}
