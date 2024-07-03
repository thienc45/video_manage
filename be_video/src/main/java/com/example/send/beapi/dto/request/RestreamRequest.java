package com.example.send.beapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestreamRequest {
    private Long id ;

    private String gioBatDau;

    private String gioKetThuc;

    private String url;
}
