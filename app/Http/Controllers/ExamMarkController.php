<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Exam;
use App\Models\ExamMark;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExamMarkController extends Controller
{
    public function store(Request $request, Exam $exam)
    {
        $fields = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'exam_id' => ['required', 'exists:exams,id'],
            'marks' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        $fields = array_merge($fields, [
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        ExamMark::create($fields);

        return redirect()->back()->with('success', 'Exam marks added successfully.');
    }

    public function destroy(ExamMark $examMark)
    {
        $examMark->delete();

        return redirect()->back()->with('success', 'Exam mark deleted successfully.');
    }
}
