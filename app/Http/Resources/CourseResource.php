<?php

namespace App\Http\Resources;

use App\Enums\CourseLevel;
use App\Enums\CourseStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);
        $array['students'] = StudentResource::collection($this->students)->toArray($request);
        $array['exams'] = ExamResource::collection($this->exams)->toArray($request);
        $array['levels'] = CourseLevel::GetKeyValuePair();
        $array['statuses'] = CourseStatus::GetKeyValuePair();

        return $array;
    }
}
