"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_repository_1 = require("./task.repository");
const task_status_enum_1 = require("../../common/enums/task-status.enum");
let TaskService = class TaskService {
    constructor(repository) {
        this.repository = repository;
    }
    async createTask(data) {
        const dueDate = new Date(data.dueDate);
        if (dueDate < new Date()) {
            throw new common_1.BadRequestException('Due date cannot be in the past');
        }
        return this.repository.create(data);
    }
    async getTasks() {
        return this.repository.findAll();
    }
    async getTaskById(id) {
        const task = await this.repository.findById(id);
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        return task;
    }
    async updateTask(id, data) {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (data.dueDate &&
            new Date(data.dueDate) < new Date()) {
            throw new common_1.BadRequestException('Due date cannot be in the past');
        }
        return this.repository.update(id, data);
    }
    async deleteTask(id) {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException('Task not found');
        }
        return this.repository.delete(id);
    }
    async completeTask(id) {
        const task = await this.repository.findById(id);
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (task.status === 'COMPLETED') {
            throw new common_1.BadRequestException('Task already completed');
        }
        return this.repository.update(id, {
            status: task_status_enum_1.TaskStatus.COMPLETED,
        });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TaskService);
//# sourceMappingURL=task.service.js.map