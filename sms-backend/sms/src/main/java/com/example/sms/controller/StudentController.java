package com.example.sms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.sms.model.Student;
import com.example.sms.repository.StudentRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository repo;

    // GET ALL
    @GetMapping
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    // ADD
    @PostMapping
    public Student addStudent(@RequestBody Student s) {
        int total = s.getMathMarks() + s.getScienceMarks() + s.getEnglishMarks();
        s.setTotalMarks(total);
        return repo.save(s);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // 🔥 FIXED UPDATE METHOD
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student s) {

        Student existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // update fields
        existing.setName(s.getName());
        existing.setEmail(s.getEmail());
        existing.setPhone(s.getPhone());
        existing.setCourse(s.getCourse());
        existing.setDepartment(s.getDepartment());

        existing.setMathMarks(s.getMathMarks());
        existing.setScienceMarks(s.getScienceMarks());
        existing.setEnglishMarks(s.getEnglishMarks());
        existing.setAttendance(s.getAttendance());

        // recalculate total
        int total = s.getMathMarks() + s.getScienceMarks() + s.getEnglishMarks();
        existing.setTotalMarks(total);

        return repo.save(existing);
    }
}