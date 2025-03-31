<?php

namespace App\Http\Controllers;

use App\Models\ExamMark;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentAverageMarkReportController extends Controller
{
    public function index(): Response
    {
        $studentAverageMarkReport = Student::has('examMarks')
            ->withAvg('examMarks as average_mark', 'marks')
            ->orderBy('id', 'desc')
            ->get()
            ->map
            ->toExportableArray();

        return Inertia::render('student-average-mark-report/index', [
            'studentAverageMarkReport' => $studentAverageMarkReport,
        ]);
    }
}
