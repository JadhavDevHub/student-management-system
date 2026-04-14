package com.example.sms;

import com.example.sms.model.Student;
import com.example.sms.repository.StudentRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmsApplication.class, args);
    }


    @Bean
    CommandLineRunner loadData(StudentRepository repo) {
        return args -> {
            
            for (int i = 1; i <= 5000; i++) {

                Student s = new Student();

                s.setName("Student " + i);
                s.setEmail("student" + i + "@mail.com");
                s.setPhone("90000000" + (i % 100));
                s.setCourse("B.Tech");
                s.setDepartment("AI & DS");

                s.setMathMarks((int)(Math.random() * 100));
                s.setScienceMarks((int)(Math.random() * 100));
                s.setEnglishMarks((int)(Math.random() * 100));
                s.setAttendance((int)(50 + Math.random() * 50));

                repo.save(s);
            }

            System.out.println("✅ 5000 students inserted!");
        };
    }
}