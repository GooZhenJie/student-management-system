<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseAverageMarkReportController extends Controller
{
    public function index(): Response
    {
        $courseAverageMarkReport = Course::has('exams.examMarks')
            ->with(['exams' => function ($query) {
                $query->withAvg('examMarks as exam_avg_mark', 'marks');
            }])
            ->get()
            ->map(function ($course) {
                $avgMark = $course->exams->avg('exam_avg_mark');

                if (isset($avgMark)) {
                    $course->average_mark = $avgMark;
                }

                $array = $course->toExportableArray();

                return $array;
            });

        return Inertia::render('course-average-mark-report/index', [
            'courseAverageMarkReport' => $courseAverageMarkReport,
        ]);
    }
}
