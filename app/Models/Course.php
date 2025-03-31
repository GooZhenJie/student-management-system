<?php

namespace App\Models;

use App\Enums\CourseLevel;
use App\Enums\CourseStatus;
use App\Traits\ExportableFields;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Course extends Model
{
    use HasFactory, ExportableFields;

    protected $guarded = [];

    protected $exportableFieldMap = [
        // 'ID' => 'id',
        'Course Code' => 'code',
        'Title' => 'title',
        'Description' => 'description',
        'Credit Hours' => 'credit_hours',
        'Level' => 'level',
        'Status' => 'status',
        'Created At' => 'created_at',
        'Created By' => 'createdBy.name',
        'Updated At' => 'updated_at',
        'Updated By' => 'updatedBy.name',
    ];

    protected function casts(): array
    {
        return [
            'level' => CourseLevel::class,
            'status' => CourseStatus::class,
        ];
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'student_course');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
