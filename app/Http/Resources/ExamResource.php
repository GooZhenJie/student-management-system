<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);

        // $array['available_students'] = StudentResource::collection(
        //     $this->courses->students()
        //         ->whereNotIn('id', $this->students->pluck('id'))
        //         ->get()
        // )->toArray($request);

        return $array;
    }
}
