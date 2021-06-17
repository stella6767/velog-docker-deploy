//package com.kang.velogbackend.congfig.jwt;
//
//import com.kang.velogbackend.congfig.auth.PrincipalDetailsService;
//import com.kang.velogbackend.service.RedisService;
//import com.kang.velogbackend.utils.CookieUtill;
//import com.kang.velogbackend.utils.JwtUtil;
//import io.jsonwebtoken.ExpiredJwtException;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@RequiredArgsConstructor
//@Component
//public class JwtRequestFilter extends OncePerRequestFilter {
//
//    private final PrincipalDetailsService principalDetailsService;
//
//    private final JwtUtil jwtUtil;
//
//    private final CookieUtill cookieUtill;
//
//    private final RedisService redisService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        final Cookie jwtToken = cookieUtill.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME);
//
//        Long userId = null;
//        String jwt = null;
//        String refreshJwt = null;
//        String refreshUname = null;
//
//        try{
//            if(jwtToken != null){
//                jwt = jwtToken.getValue();
//                userId = jwtUtil.getUserId(jwt);
//            }
//            if(userId !=null){
//
//                if(jwtUtil.validateToken(jwt,)){
//                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
//                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//                }
//            }
//        }catch (ExpiredJwtException e){
//            Cookie refreshToken = cookieUtil.getCookie(httpServletRequest,JwtUtil.REFRESH_TOKEN_NAME);
//            if(refreshToken!=null){
//                refreshJwt = refreshToken.getValue();
//            }
//        }catch(Exception e){
//
//        }
//
//        try{
//            if(refreshJwt != null){
//                refreshUname = redisUtil.getData(refreshJwt);
//
//                if(refreshUname.equals(jwtUtil.getUsername(refreshJwt))){
//                    UserDetails userDetails = userDetailsService.loadUserByUsername(refreshUname);
//                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
//                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//
//                    Member member = new Member();
//                    member.setUsername(refreshUname);
//                    String newToken =jwtUtil.generateToken(member);
//
//                    Cookie newAccessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME,newToken);
//                    httpServletResponse.addCookie(newAccessToken);
//                }
//            }
//        }catch(ExpiredJwtException e){
//
//        }
//
//        filterChain.doFilter(request,response);
//    }
//}
