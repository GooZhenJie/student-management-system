<?php

use App\Http\Controllers\CourseAverageMarkReportController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamMarkController;
use App\Http\Controllers\StudentAverageMarkReportController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentCourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('student.index')
        : redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('student', StudentController::class);
    Route::resource('course', CourseController::class);
    Route::resource('exam', ExamController::class);
    Route::resource('exam-mark', ExamMarkController::class);
    Route::get('student-average-mark-report', [StudentAverageMarkReportController::class, 'index']);
    Route::get('course-average-mark-report', [CourseAverageMarkReportController::class, 'index']);

    Route::post('/student-courses/{course}/students', [StudentCourseController::class, 'store']);
    Route::delete('/student-courses/{course}/students/{student}', [StudentCourseController::class, 'destroy']);

    Route::post('/course-exams/{course}/exams', [ExamController::class, 'linkToCourse']);
    Route::delete('/course-exams/{course}/exams/{exam}', [ExamMarkController::class, 'destroy']);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
