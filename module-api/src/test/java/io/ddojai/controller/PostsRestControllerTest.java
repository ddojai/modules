package io.ddojai.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT,
        properties = "spring.config.location="
        + "classpath:application.yml,"
        + "/app/config/community/application-auth.yml")
public class PostsRestControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testProfile () {
//        //when
//        String profile = this.restTemplate.getForObject("/api/profile", String.class);
//
//        //then
//        assertThat(profile).isEqualTo("local");
    }
}
