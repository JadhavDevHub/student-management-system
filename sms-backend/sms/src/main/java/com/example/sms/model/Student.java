package com.example.sms.model;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String course;
    private String department;

    private int mathMarks;
    private int scienceMarks;
    private int englishMarks;
    private int totalMarks;
    public int getMathMarks() { return mathMarks; }
    public void setMathMarks(int mathMarks) { this.mathMarks = mathMarks; }

    private double attendance;
    public double getAttendance() {
        return attendance;
    }

    public void setAttendance(double attendance) {
        this.attendance = attendance;
    }

    public int getScienceMarks() { return scienceMarks; }
    public void setScienceMarks(int scienceMarks) { this.scienceMarks = scienceMarks; }

    public int getEnglishMarks() { return englishMarks; }
    public void setEnglishMarks(int englishMarks) { this.englishMarks = englishMarks; }

    public int getTotalMarks() { return totalMarks; }
    public void setTotalMarks(int totalMarks) { this.totalMarks = totalMarks; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
