package com.kang.velogbackend.web.dto.user;

import com.kang.velogbackend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserVelogRespDto {
    private User user;
    private boolean followState;
    private Long followCount;
    private Long postCount;

}
