<?php

namespace App\Enums;

use App\Traits\Enum;

enum CourseStatus: string
{
    use Enum;

    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
