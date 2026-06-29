"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  organizationSlug: string;
};

const team = [
  { name: "João Silva", email: "joao@email.com", role: "owner" },
  { name: "Maria Souza", email: "maria@email.com", role: "admin" },
  { name: "Carlos Santos", email: "carlos@email.com", role: "member" },
  { name: "Ana Costa", email: "ana@email.com", role: "member" },
];

const roleLabels: Record<string, string> = {
  owner: "Proprietário",
  admin: "Admin",
  member: "Membro",
};

export function TeamSettings({ organizationSlug }: Props) {
  return (
    <div className="w-full max-w-3xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Equipe</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie os membros da sua organização
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Membros</CardTitle>
              <CardDescription>{team.length} membros no total</CardDescription>
            </div>
            <Button>Convidar</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Função</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{roleLabels[member.role]}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {member.role !== "owner" && (
                      <Button variant="ghost" size="sm">
                        Remover
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
