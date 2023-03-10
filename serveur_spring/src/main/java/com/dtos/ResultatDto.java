package com.dtos;

import lombok.Data;
import java.util.Set;

@Data
public class ResultatDto {
    private Boolean ok;
    private String message;
    private Set<Object> data;
}
