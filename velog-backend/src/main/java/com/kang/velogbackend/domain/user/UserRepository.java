package com.kang.velogbackend.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    User findByUsername(String username);  //이건 옵셔널 안 걸거임
}
