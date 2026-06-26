"use client";

import { Check, MailPlus, UserCheck, UserMinus, UserX } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialPendingRequests = [
  {
    id: "1",
    name: "Carlos Eduardo",
    email: "carlos.edu@gmail.com",
    role: "Motorista",
  },
  {
    id: "2",
    name: "Amanda Silva",
    email: "amanda.s@outlook.com",
    role: "Operador BDC",
  },
];

const initialActiveMembers = [
  {
    id: "101",
    name: "Rodrigo Melo",
    email: "rodrigo.melo@empresa.com",
    role: "Gerente (Você)",
    status: "owner",
  },
  {
    id: "102",
    name: "Marcos Souza",
    email: "marcos.souza@gmail.com",
    role: "Motorista",
    status: "active",
  },
  {
    id: "103",
    name: "Fernanda Lima",
    email: "fernanda.bdc@hotmail.com",
    role: "Operador BDC",
    status: "active",
  },
];

export function TeamSettings() {
  const [pendingRequests, setPendingRequests] = React.useState(
    initialPendingRequests,
  );
  const [activeMembers, setActiveMembers] =
    React.useState(initialActiveMembers);

  // Estados para o formulário de convite
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState("Motorista");

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    console.log(
      `Enviando convite para: ${inviteEmail} com a função: ${inviteRole}`,
    );

    // Aqui você integraria com sua API ou Supabase para disparar o convite por e-mail
    alert(`Convite enviado com sucesso para ${inviteEmail}!`);

    setInviteEmail("");
  };

  const handleAccept = (id: string) => {
    console.log(`Membro ${id} aceito.`);
    const request = pendingRequests.find((r) => r.id === id);
    if (request) {
      setActiveMembers([
        ...activeMembers,
        {
          id,
          name: request.name,
          email: request.email,
          role: request.role,
          status: "active",
        },
      ]);
      setPendingRequests(pendingRequests.filter((r) => r.id !== id));
    }
  };

  const handleReject = (id: string) => {
    console.log(`Solicitação ${id} recusada.`);
    setPendingRequests(pendingRequests.filter((r) => r.id !== id));
  };

  const handleBan = (id: string) => {
    if (
      confirm(
        "Tem certeza que deseja banir/remover este membro da organização?",
      )
    ) {
      console.log(`Membro ${id} banido.`);
      setActiveMembers(activeMembers.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-6 space-y-8">
      {/* 1. SEÇÃO DE CONVITE DE NOVO MEMBRO */}
      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <MailPlus className="size-4 text-primary" />
            Convidar para a Equipe
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Envie um convite direto por e-mail para pré-aprovar um novo
            colaborador na organização.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-5 px-6">
          <form
            onSubmit={handleSendInvite}
            className="flex flex-col sm:flex-row items-end gap-3 w-full"
          >
            <div className="flex-1 w-full space-y-1.5">
              <label
                htmlFor="invite-email"
                className="text-xs font-medium text-foreground"
              >
                E-mail do Colaborador
              </label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colaborador@empresa.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
              />
            </div>

            <div className="w-full sm:w-48 space-y-1.5">
              <label
                htmlFor="invite-role"
                className="text-xs font-medium text-foreground"
              >
                Função / Cargo
              </label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger
                  id="invite-role"
                  className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
                >
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Motorista">Motorista</SelectItem>
                  <SelectItem value="Operador BDC">Operador BDC</SelectItem>
                  <SelectItem value="Gerente">Gerente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="rounded-lg cursor-pointer h-9 hover:bg-primary/80 w-full sm:w-auto text-sm"
            >
              Enviar Convite
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 2. SEÇÃO DE SOLICITAÇÕES PENDENTES */}
      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            Aprovações Pendentes
            {pendingRequests.length > 0 && (
              <Badge
                variant="destructive"
                className="rounded-full px-2 py-0.5 text-[10px]"
              >
                {pendingRequests.length}
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Novos membros que solicitaram vínculo usando o e-mail desta
            concessionária.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
              <UserCheck className="size-8 text-muted-foreground/40" />
              Nenhuma solicitação aguardando aprovação no momento.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-xs font-medium px-6 py-3">
                    Nome / E-mail
                  </TableHead>
                  <TableHead className="text-xs font-medium px-6 py-3">
                    Função Pretendida
                  </TableHead>
                  <TableHead className="text-xs font-medium px-6 py-3 text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow
                    key={request.id}
                    className="hover:bg-muted/20 border-b border-border"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {request.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {request.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className="text-xs font-normal">
                        {request.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request.id)}
                          className="h-8 rounded-lg text-xs gap-1 cursor-pointer border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <UserX className="size-3.5" />
                          Recusar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAccept(request.id)}
                          className="h-8 rounded-lg text-xs gap-1 cursor-pointer hover:bg-primary/80"
                        >
                          <Check className="size-3.5" />
                          Aceitar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* 3. SEÇÃO DE MEMBROS ATIVOS */}
      <Card className="p-0 shadow-sm border-muted/60">
        <CardHeader className="px-6 pt-5 pb-4 border-b border-border">
          <CardTitle className="text-base font-medium">
            Membros da Equipe
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground font-normal">
            Lista de usuários com acesso ativo à plataforma nesta organização.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs font-medium px-6 py-3">
                  Membro
                </TableHead>
                <TableHead className="text-xs font-medium px-6 py-3">
                  Função
                </TableHead>
                <TableHead className="text-xs font-medium px-6 py-3 text-right">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeMembers.map((member) => (
                <TableRow
                  key={member.id}
                  className="hover:bg-muted/20 border-b border-border"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {member.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      variant={
                        member.status === "owner" ? "default" : "secondary"
                      }
                      className="text-xs font-normal"
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    {member.status !== "owner" ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleBan(member.id)}
                        className="h-8 rounded-lg text-xs gap-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        <UserMinus className="size-3.5" />
                        Banir do Time
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground font-normal px-3 py-1 bg-muted rounded-md border border-border">
                        Inalterável
                      </span>
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
